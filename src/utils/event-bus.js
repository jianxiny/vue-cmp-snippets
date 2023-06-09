export function eventBus() {
    const allHandlers = new Map()

    return {
        on(type, handler) {
            let handlers = allHandlers.get(type)
            if (!handlers) handlers = [handler]
            else handlers.push(handler)
            allHandlers.set(type, handlers)
        },

        off(type, handler) {
            const handlers = allHandlers.get(type)
            if (!handlers) return
            handlers.splice(handlers.indexOf(handler) >>> 0, 1)
        },

        emit(type, evt) {
            const handlers = allHandlers.get(type)
            if (!handlers) return
            new Set(handlers).forEach(handler => handler(evt))
        }
    }
}