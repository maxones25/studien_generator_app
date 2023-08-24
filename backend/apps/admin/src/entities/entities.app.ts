import { Module } from "@nestjs/common";
import { FieldsApp } from "./fields/fields.app";
import { EntitiesApp as RootEntitiesApp } from "./entities/entities.app";

@Module({ imports: [RootEntitiesApp, FieldsApp] })
export class EntitiesApp {}