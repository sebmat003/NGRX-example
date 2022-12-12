import { EntityState } from "@ngrx/entity";

export const convertArrayToEntityState = ( array: any[]): EntityState<any> => {
  return {
    ids: [...array.map(value => value.id)],
    entities: {
      ...array.reduce((acc, value) => {
        return {...acc, [value.id.toString()]: value };
      }, {})
    }
  };
}