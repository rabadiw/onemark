import MarkState from './MarkState';
import MarkService, { MarkServiceOption } from '../../../marks/MarkService';

it('mark service', async () => {
    expect.assertions(1)

    const presentfn = jest.fn((args) => {
        console.debug(...args)
    })

    let markServiceOption: MarkServiceOption = {
        baseApiUrl: '',
        isDesignMode: true
    }
    let markSvc = new MarkService(markServiceOption)
    // let state = new MarkState(markSvc, (state) => {
    //     console.info(state)
    // }, {}, {})

    // state.fetch(null, 'Filter')

    // expect(presentfn).toBeCalled()

    try {
        console.info("Calling getmarks")
        let data = await markSvc.getMarks();
        expect(data).toBeNull();
    } catch (e) {
        expect(e).toMatch('error')
    }

})