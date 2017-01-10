import { fork } from 'redux-saga/effects';
import { watchRegister, watchLogin, watchGetAuthedUser } from './accountWatcher';
import { watchPostPhoto } from './photoWatcher';
import { watchFollowSuggestion, watchFollowMember, watchUnFollowMember } from './followWatcher';
import { watchFetchTimelinePhotos, watchFetchLikes, watchLike, watchUnLike, watchFetchComments, watchComment } from './timelineWatcher';

export default function* root() {
  yield [
    fork(watchGetAuthedUser),
    fork(watchRegister),
    fork(watchLogin),
    fork(watchPostPhoto),
    fork(watchFollowSuggestion),
    fork(watchFollowMember),
    fork(watchUnFollowMember),
    fork(watchFetchTimelinePhotos),
    fork(watchFetchLikes),
    fork(watchLike),
    fork(watchUnLike),
    fork(watchFetchComments),
    fork(watchComment)
  ];
}
