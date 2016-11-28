export function propertiesDiffer(entityA: {}, entityB: {}) {
    return Object.keys(entityA).find(key => entityA[key] !== entityB[key]);
}

export function exLog(...mix) {
  if ('production' === ENV) {
    // Production
  } else {
    console.log.apply(console, mix);
  }
}
