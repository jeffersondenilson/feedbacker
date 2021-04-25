import bus from '../utils/bus'
import useModal from './useModal'

const EVENT_NAME = 'modal:toggle'

describe('useModal hooks', () => {
  it('should listen to event', () => {
    const modal = useModal()
    const payload = { status: true, component: 'ModalCreateAccount' }
    const spy = jest.fn()

    modal.listen(spy)
    bus.emit(EVENT_NAME, { ...payload })

    expect(spy).toBeCalledTimes(1)
    expect(spy).toBeCalledWith(payload)
  })

  it('should unlisten to event', () => {
    const modal = useModal()
    const payload = { status: true, component: 'ModalCreateAccount' }
    const spy = jest.fn()
    modal.listen(spy)

    modal.off(spy)
    bus.emit(EVENT_NAME, payload)

    expect(spy).not.toBeCalled()
  })

  it('should emit event with payload { status: true, ...rest }', () => {
    const modal = useModal()
    const payload = { component: 'ModalCreateAccount' }
    const spy = jest.fn()
    modal.listen(spy)

    modal.open({ ...payload })

    expect(spy).toBeCalledTimes(1)
    expect(spy).toBeCalledWith({
      status: true,
      ...payload
    })
  })

  it('should emit event with payload { status: false, ...rest }', () => {
    const modal = useModal()
    const payload = { component: 'ModalLogin' }
    const spy = jest.fn()
    modal.listen(spy)

    modal.close({ ...payload })

    expect(spy).toBeCalledTimes(1)
    expect(spy).toBeCalledWith({
      status: false,
      ...payload
    })
  })
})
