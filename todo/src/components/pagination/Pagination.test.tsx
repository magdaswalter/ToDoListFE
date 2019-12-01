import {configure, shallow, ShallowWrapper} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import Pagination from '../pagination/Pagination';
import * as React from "react";

describe('Pagination', () => {
    let pagination: ShallowWrapper;
    const mockChangePage = jest.fn();

    const props = {
        paginationV: {
            totalPages: 3,
            totalElements: 16,
            actualPage: 2
        },
        changePage: mockChangePage
    };

    beforeEach(() => {
        pagination = shallow(<Pagination {...props} />);
    });

    it('renders without crashing', () => {
        expect(pagination).toMatchSnapshot();
    });

    it('call changePage() on BackButtonClick', () => {
        pagination
            .find('[id="BackButton"]')
            .simulate('click');
        expect(mockChangePage).toHaveBeenCalledWith(props.paginationV.actualPage - 1, 6);
    });

    it('call changePage() on NextButtonClick', () => {
        pagination
            .find('[id="NextButton"]')
            .simulate('click');
        expect(mockChangePage).toHaveBeenCalledWith(props.paginationV.actualPage + 1, 6);
    });

});
