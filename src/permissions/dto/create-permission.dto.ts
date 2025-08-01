import { IsNotEmpty, IsString } from "class-validator";

export class CreatePermissionDto {
  @IsNotEmpty()
  @IsString()
  moduleName: string;
}