import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

configure({ adapter: new Adapter() });

describe('auth reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      token: null,
      userId: null,
      error: null,
      loading: false,
      authRedirectPath: '/',
    });
  });

  it('store token on login', () => {
    expect(
      reducer(
        {
          token: null,
          userId: null,
          error: null,
          loading: false,
          authRedirectPath: '/',
        },
        {
          type: actionTypes.AUTH_SUCCESS,
          idToken: 'toke_passed',
          userId: 'the_user_id',
        }
      )
    ).toEqual({
      token: 'toke_passed',
      userId: 'the_user_id',
      error: null,
      loading: false,
      authRedirectPath: '/',
    });
  });
});
