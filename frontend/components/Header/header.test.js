import React from 'react';
import { shallow } from 'enzyme';
jest.mock('graphql-hooks');
import { useQuery } from 'graphql-hooks';
import Header from './Header';

useQuery.mockReturnValue({
  data: {
    loading: false,
    error: null,
    menuItems: {
      nodes: [
        {
          id: '1',
          name: 'Overig (algemene RI&E)',
        },
        {
          id: '2',
          name: 'Bakkers',
        },
        {
          id: '3',
          name: 'Kappers',
        },
        {
          id: '4',
          name: 'Schoenherstellers',
        },
        {
          id: '5',
          name: 'Slagers',
        },
      ],
    },
  },
});

describe('Header', () => {
  it('should render correctly with children', async () => {
    const element = shallow(<Header />);
    expect(element).toMatchSnapshot();
  });
});
