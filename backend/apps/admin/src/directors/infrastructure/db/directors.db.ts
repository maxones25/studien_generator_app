import { Director } from "@entities";
import { TypeOrmModule } from "@nestjs/typeorm";

export const DirectorsDb = TypeOrmModule.forFeature([Director]);

export default DirectorsDb;