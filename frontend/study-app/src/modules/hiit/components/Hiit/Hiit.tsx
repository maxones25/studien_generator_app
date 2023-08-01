import { Button, Column, Text } from '@modules/core/components';
import { FormField } from '@modules/forms/types';
import { useHiit } from '@modules/hiit/hooks';
import { useEffect, useState } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { Control, Controller, FieldValues, Path, PathValue, get } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FailureDialog } from '..';

export interface HiitProps {
  control: Control<FieldValues>;
  componentId: string;
  formFields: FormField[];
  label?: string;
  attributes?: {[x: string]: any};
}

export function Hiit ({
  label,
  control,
  componentId,
  formFields,
}: HiitProps) {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const {
    isPlaying,
    phase,
    isLastPhase,
    setPhases,
    setIsPlaying,
    nextPhase,
  } = useHiit();

  useEffect(() => {
    setPhases([
      {
        time: 5,
        name: 'phase1',
        description: 'Beschreibe mal die Phase'
      },
      {
        time: 5,
        name: 'phase2',
        description: 'Beschreibe mal die Phase'
      },
    ])
  }, [])

  const onDialogCancel = () => {
    setOpen(false);
    setIsPlaying(true);
  }

  const openDialog = () => {
    setIsPlaying(false);
    setOpen(true);
  }


  const start: Path<FieldValues> = `${componentId}.${formFields[0].entityFieldId}` as Path<FieldValues>
  const failure: Path<FieldValues> = `${componentId}.${formFields[1].entityFieldId}` as Path<FieldValues>
  const end: Path<FieldValues> = `${componentId}.${formFields[2].entityFieldId}` as Path<FieldValues> 

  return (
    <Column alignItems={'center'}>
      <Text>{label ?? 'Label'}</Text>
      <Controller 
         control={control}
         name={end}
         rules={{
          validate: () => {
            return Boolean(get(control._formValues, failure) || get(control._formValues, end)) 
              || 'error'
          }
        }}
         render={({ field: { onChange }}) => {
          return(
            <CountdownCircleTimer 
              isPlaying={isPlaying}
              duration={phase?.time ?? 10}
              colors={["#F7B801", "#A30000", "#A30000"]}
              colorsTime={[5, 2, 0]}
              onComplete={() => {
                if (!nextPhase()) {
                  setIsPlaying(false);
                  onChange(new Date() as PathValue<FieldValues, Path<FieldValues>>);
                } else {
                  return ({ shouldRepeat: true })
                }
              }}
            >
              {({ remainingTime }) => remainingTime}
            </CountdownCircleTimer>
          )
        }}
      />
      <Text>{phase?.name ?? 'Label'}</Text>
      <Text>{phase?.description ?? 'Label'}</Text>
      {!isPlaying ? (
        <Controller 
          control={control}
          name={start}
          rules={{
            required: true,
          }}
          render={({ field: { onChange }, }) => {
            return(
              <Button 
                testId='hiit-start-done-button'
                disabled={isLastPhase}
                onClick={() => {
                  setIsPlaying(true)
                  onChange(new Date() as PathValue<FieldValues, Path<FieldValues>>)}
                } 
              >
                {t(isLastPhase ? 'done' : 'start')}
              </Button>
            )
          }}
        />
      ) : (
        <Button 
          testId='hiit-cancel-button'
          onClick={openDialog}
        >
          {t('cancel')}
        </Button>
      )}
      <FailureDialog 
        open={open}
        onClose={onDialogCancel}
        onAccept={() => setOpen(false)}
        control={control}
        name={failure}
        rules={{
          validate: () => {
            return Boolean(get(control._formValues, failure) || get(control._formValues, end)) 
              || 'error'
          }
        }}
      />
    </Column>
  );
};