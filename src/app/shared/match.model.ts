export class MatchModel {

  constructor(
    public personaje1_id: string,
    public personaje2_id: string,
    public ip: string = '',
    public message: string | null
  ) { }

}
