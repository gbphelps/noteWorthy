export const TOGGLE = 'TOGGLE';

export const toggle = entity => {
  console.log(entity);
  return {
    type: TOGGLE,
    entity
  }
}
