export class CreateEndpointAccessDto {
  userId: number;
  endpoint: string;
  method: string;
  approved: boolean;
}