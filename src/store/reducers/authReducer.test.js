import authReducer, {initialState} from './authReducer';
import { AUTH_SUCCESSFUL, LOG_OUT } from '../constants/actionTypes';

describe('auth reducer', () => {

  it('returns initial state', () => {
    expect(authReducer(initialState, {})).toEqual(initialState)
  })

  // it('sets up fetched dog url', () => {
  //   // given
  //   const beforeState = {url: ''};
  //   const action = {type: FETCH_DOG_SUCCESS, payload: {url: 'https://dog.ceo/api/img/someDog.jpg'}};
  //   // when
  //   const afterState = dogReducer(beforeState, action);
  //   // then
  //   expect(afterState).toEqual({url: 'https://dog.ceo/api/img/someDog.jpg'});
  // });
})
