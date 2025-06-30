import { SetMetadata } from '@nestjs/common';

export const ModuleName = (name: string) => SetMetadata("moduleName", name);