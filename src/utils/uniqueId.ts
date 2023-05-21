let lastId = 0

export function uniqueId(prefix = 'x-id_') {
  lastId++
  return prefix + lastId
}
