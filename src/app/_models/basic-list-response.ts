export class BasicListResponse {
  status: boolean;
  data: any[]


  constructor(status: boolean, data: any[]) {
    this.status = status;
    this.data = data;
  }
}
