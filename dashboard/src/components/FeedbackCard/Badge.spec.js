import { shallowMount } from '@vue/test-utils'
import Badge from './Badge'
import { LABELS, COLORS } from '@/utils/constants'

const wrapperFactory = (props) => {
  return shallowMount(Badge, {
    props
  })
}

describe('<Badge />', () => {
  it('should render badge of type issue', async () => {
    const type = 'issue'
    const wrapper = wrapperFactory({ type })

    const badge = wrapper.find('[data-test=badge]')

    expect(badge.classes(`bg-${COLORS[type]}`)).toBe(true)
    expect(badge.text()).toBe(LABELS[type])
  })

  it('should render badge of type idea', async () => {
    const type = 'idea'
    const wrapper = wrapperFactory({ type })

    const badge = wrapper.find('[data-test=badge]')

    expect(badge.classes(`bg-${COLORS[type]}`)).toBe(true)
    expect(badge.text()).toBe(LABELS[type])
  })

  it('should render badge of type other', async () => {
    const type = 'other'
    const wrapper = wrapperFactory({ type })

    const badge = wrapper.find('[data-test=badge]')

    expect(badge.classes(`bg-${COLORS[type]}`)).toBe(true)
    expect(badge.text()).toBe(LABELS[type])
  })

  it('should render type other when unknown type', async () => {
    const type = 'non-existing-type'
    const wrapper = wrapperFactory({ type })

    const badge = wrapper.find('[data-test=badge]')

    expect(badge.classes(`bg-${COLORS.other}`)).toBe(true)
    expect(badge.text()).toBe(LABELS.other)
  })
})
