import {
  AppointmentSchema,
  FormConfiguration as FormConfigurationSchema,
  FormScheduleAttributes,
  GroupSchema,
} from '@entities/schema';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { IGroupsRepository } from '@admin/groups/domain';
import { FormConfig, FormConfigType, Group } from '@entities/core/group';
import { TypeOrmRepository } from '@shared/modules/db';
import { GroupAppointment } from '@entities/core/appointment';

export class GroupsRepository implements IGroupsRepository {
  private readonly groups: TypeOrmRepository<GroupSchema>;
  private readonly appointments: TypeOrmRepository<AppointmentSchema>;
  private readonly formConfigs: TypeOrmRepository<FormConfigurationSchema>;

  constructor(
    @InjectRepository(GroupSchema)
    groups: Repository<GroupSchema>,
    @InjectRepository(AppointmentSchema)
    appointments: Repository<AppointmentSchema>,
    @InjectRepository(FormConfigurationSchema)
    formConfigs: Repository<FormConfigurationSchema>,
  ) {
    this.groups = new TypeOrmRepository(groups);
    this.appointments = new TypeOrmRepository(appointments);
    this.formConfigs = new TypeOrmRepository(formConfigs);
  }

  async createGroup(group: Group): Promise<string> {
    await this.groups.create(group);
    return group.id;
  }

  async changeGroupName({ id, name }: Group): Promise<number> {
    return await this.groups.update(id, { name });
  }

  async hardDeleteGroup(groupId: string): Promise<number> {
    return this.groups.hardDelete(groupId);
  }

  async softDeleteGroup(groupId: string): Promise<number> {
    return this.groups.softDelete(groupId);
  }

  async restoreGroup(groupId: string): Promise<number> {
    return this.groups.restore(groupId);
  }

  async getGroupById(groupId: string): Promise<Group> {
    return this.groups.findOne({
      where: {
        id: groupId,
        deletedAt: IsNull(),
      },
      select: {
        id: true,
        name: true,
      },
    });
  }

  async isGroupDeleted(groupId: string): Promise<boolean> {
    return this.groups.isDeleted(groupId);
  }

  async getGroupByStudy(studyId: string, id: string): Promise<Group> {
    return this.groups.findOne({
      where: {
        id,
        studyId,
      },
    });
  }

  async getGroupsByStudy(studyId: string, deleted: boolean): Promise<Group[]> {
    const deletedAt = deleted ? undefined : IsNull();
    return this.groups.find({
      where: {
        studyId,
        deletedAt,
      },
      select: {
        id: true,
        name: true,
        createdAt: true,
        modifiedAt: true,
        deletedAt: true,
      },
      order: {
        deletedAt: 'ASC',
        name: 'ASC',
      },
    });
  }

  async createGroupAppointment(appointment: GroupAppointment): Promise<string> {
    await this.appointments.create(appointment);
    return appointment.id;
  }

  async getGroupAppointments(
    studyId: string,
    groupId: string,
  ): Promise<GroupAppointment[]> {
    return this.appointments.find({
      where: [
        { studyId, groupId: IsNull(), participantId: IsNull() },
        { studyId: IsNull(), groupId, participantId: IsNull() },
      ],
    });
  }

  getFormConfigsByForm(groupId: string, formId: string): Promise<FormConfig[]> {
    return this.formConfigs.find({ where: { groupId, formId } });
  }

  async createFormConfig(formConfig: FormConfig): Promise<string> {
    await this.formConfigs.create(formConfig);
    return formConfig.id;
  }

  activateFormConfig(formConfigId: string): Promise<number> {
    return this.formConfigs.update(formConfigId, { isActive: true });
  }

  deactivateFormConfig(formConfigId: string): Promise<number> {
    return this.formConfigs.update(formConfigId, { isActive: false });
  }

  getFormConfigById(id: string): Promise<FormConfig> {
    return this.formConfigs.findOne({ where: { id } });
  }

  setFormConfigType(formConfigId: string, type: FormConfigType) {
    return this.formConfigs.update(formConfigId, { type });
  }

  deleteFormConfig(formConfigId: string) {
    return this.formConfigs.hardDelete(formConfigId);
  }

  async hasGroupFormWithType(
    groupId: string,
    formId: string,
    type: FormConfigType,
  ) {
    const formConfig = await this.formConfigs.findOne({
      where: { groupId, formId, type },
    });
    return formConfig !== null;
  }

  async getFormConfigs(
    groupId: string,
    isActive?: boolean,
    type?: FormConfigType,
  ): Promise<FormConfig[]> {
    const configs = await this.formConfigs.find({
      where: {
        groupId,
        isActive,
        type,
      },
      order: {
        form: {
          name: 'DESC',
        },
        type: 'DESC',
      },
      relations: {
        form: true,
        schedules: {
          attributes: true,
        },
      },
      select: {
        id: true,
        isActive: true,
        type: true,
        form: {
          id: true,
          name: true,
        },
        schedules: {
          id: true,
          type: true,
          period: true,
          postpone: {
            duration: true,
            times: true,
          },
          restrict: {
            before: true,
            after: true,
          },
          times: true,
          attributes: {
            key: true,
            value: true,
          },
        },
      },
    });

    return configs.map((config) => ({
      ...config,
      schedules: config.schedules.map(({ attributes, ...schedule }) => ({
        ...schedule,
        ...attributes.reduce<FormScheduleAttributes>((obj, attribute) => {
          const { key, value } = attribute;
          obj[key] = value;
          return obj;
        }, {}),
      })),
    }));
  }
}
