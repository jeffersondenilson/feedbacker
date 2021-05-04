import { defineComponent, h, Suspense } from 'vue'
import { mount, flushPromises } from '@vue/test-utils'
import Filters from './Filters'
import services from '@/services'
import { LABELS, COLORS } from '@/utils/constants'

jest.mock('@/services', () => {
  const summary = { all: 7, issue: 3, idea: 3, other: 1 }
  return {
    feedbacks: {
      getSummary: async () => ({ data: summary })
    }
  }
})

// necessário para rodar async setup
const wrapInSuspense = async (component, options) => {
  const wrapper = mount(defineComponent({
    render () {
      // return h(Suspense, null, {
      //   default: h(component),
      //   fallback: h('div', 'fallback')
      // })
      return h(
        'div',
        h(Suspense, null, {
          default: h(component),
          fallback: h('div', 'fallback')
        })
      )
    }
  }), options)

  await flushPromises()
  return wrapper
}

describe('<Filters />', () => {
  it('should render filters correctly', async () => {
    const wrapper = await wrapInSuspense(Filters, {
      rendersDefaultSlot: true
    })

    const filters = wrapper.findAll('[data-test=filter]')
    expect(filters.length).toBe(4)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it.skip('should set issue as active', async () => {
    const wrapper = await wrapInSuspense(Filters, {
      rendersDefaultSlot: true
    })

    // clicar em issue
    // verificar se 'select' foi emitido com type
    // verificar se filter tem as classes de active
    // verificar se filter-amount tem classes de active
    const issueFilter = wrapper.find('[data-test-filter-type=issue]')
    await issueFilter.trigger('click')
    // { click: [ [ [MouseEvent] ] ] }
    console.log('emitted', wrapper.emitted())
    expect(wrapper.emitted()).toHaveProperty('select')
  })
})
