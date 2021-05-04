import { shallowMount } from '@vue/test-utils'
import FeedbackCard from '.'
import { wait } from '@/utils/timeout'

// TODO: fazer mock de diff time, se não vai falhar todo dia
// ou mudar createdAt do feedback

const feedback = {
  text: 'Muito bom!',
  fingerprint: '490135491',
  id: 'eab759f8-f238-4ff9-ae91-ee1558982329',
  apiKey: 'fcd5015c-10d3-4e9c-b395-ec7ed8850165',
  type: 'OTHER',
  device: 'Chrome 85.0, macOS 10.14',
  page: 'https://feedbacker.com/pricing',
  createdAt: new Date('2020-11-13').getTime()
}

jest.mock('@/utils/timeout')

const wrapperFactory = (props) => {
  return shallowMount(FeedbackCard, {
    props: {
      feedback,
      ...props
    }
  })
}

describe('<FeedbackCard />', () => {
  it('should render closed card', async () => {
    const wrapper = wrapperFactory()

    const details = wrapper.find('[data-test=details]')
    const closedIcon = wrapper.find('[data-test=closed-icon]')

    expect(details.exists()).toBe(false)
    expect(closedIcon.exists()).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render open card', async () => {
    const wrapper = wrapperFactory({ isOpened: true })

    const details = wrapper.find('[data-test=details]')
    const closedIcon = wrapper.find('[data-test=closed-icon]')

    expect(details.exists()).toBe(true)
    expect(closedIcon.exists()).toBe(false)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should open card when clicked', async () => {
    const wrapper = wrapperFactory()

    await wrapper.find('[data-test=toggle-card]').trigger('click')

    const details = wrapper.find('[data-test=details]')
    const closedIcon = wrapper.find('[data-test=closed-icon]')
    expect(wrapper.emitted()).toHaveProperty('click')
    expect(details.exists()).toBe(true)
    expect(closedIcon.exists()).toBe(false)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
