// ContactList.test.tsx
import React from 'react';
import { render } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import ContactList from '../screens/ContactList';
import { RootState } from '../store/store';

const mockStore = configureStore<RootState>();

describe('ContactList', () => {
  let store: MockStoreEnhanced<RootState>;

  beforeEach(() => {
    store = mockStore({
      contacts: {
          contacts: [{ id: '1', firstName: 'John Doe', lastName: '1234567890', age: 18, photo: 'photo'}],
          loading: false,
          error: null,
          selectedContactId: ''
      },
    });
  });

  it('should render the contact list', () => {
    const { getByText } = render(
      <Provider store={store}>
        <ContactList/>
      </Provider>
    );
    expect(getByText('John Doe')).toBeDefined();
  });

});