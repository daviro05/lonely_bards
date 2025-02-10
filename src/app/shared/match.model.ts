export class MatchModel {

  constructor(
    public personaje1_id: string,
    public personaje2_id: string,
    public personaje1_name: string,
    public personaje2_name: string,
    public ip: string = '',
    public message: string | null,
    public tipo: string
  ) { }

}
