import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import { HeaderContainer } from '../containers/HeaderContainer';
import { PlayerContainer } from '../containers/PlayerContainer';
import { PlaylistContainer } from '../containers/PlaylistContainer';
import ItemList from '../components/ItemList';
import Activities from '../components/Activities';

export class Dashboard extends React.Component {

  getInnerContent() {
    const {
      currentUser,
      activities,
      activitiesNextHref,
      fetchActivities,
      followings,
      followingsNextHref,
      followingsRequestInProcess,
      fetchFollowings,
      followers,
      followersNextHref,
      followersRequestInProcess,
      fetchFollowers,
      favorites,
      favoritesNextHref,
      favoritesRequestInProcess,
      fetchFavorites
    } = this.props;

    if (!currentUser) {
      return <div></div>;
    }

    return (<div className="dashboard-content">
      <div className="dashboard-content-main">
        <Activities
          {...this.props}
          activities={activities}
          scrollFunction={() => fetchActivities(null, activitiesNextHref)}
        />
      </div>
      <div className="dashboard-content-side">
        <ItemList
          title="Followings"
          list={followings}
          nextHref={followingsNextHref}
          requestInProcess={followingsRequestInProcess}
          currentUser={currentUser}
          fetchMore={fetchFollowings}
          kind="user"
          {...this.props}
        />
        <ItemList
          title="Followers"
          list={followers}
          nextHref={followersNextHref}
          requestInProcess={followersRequestInProcess}
          currentUser={currentUser}
          fetchMore={fetchFollowers}
          kind="user"
          {...this.props}
        />
        <ItemList
          title="Favorites"
          list={favorites}
          nextHref={favoritesNextHref}
          requestInProcess={favoritesRequestInProcess}
          currentUser={currentUser}
          fetchMore={fetchFavorites}
          kind="track"
          {...this.props}
        />
      </div>
    </div>);
  }

  render() {
    return (<div className="dashboard">
      <HeaderContainer genre={this.props.genre} pathname={this.props.pathname}/>
      {this.getInnerContent()}
      <PlaylistContainer />
      <PlayerContainer />
    </div>);
  }

}

function mapStateToProps(state, routerState) {
  return {
    pathname: routerState.location.pathname,
    genre: routerState.location.query.genre,
    currentUser: state.session.user,
    activeTrack: state.player.activeTrack,
    isPlaying: state.player.isPlaying,
    followings: state.user.followings,
    followingsNextHref: state.user.followingsNextHref,
    followingsRequestInProcess: state.user.followingsRequestInProcess,
    activities: state.user.activities,
    activitiesNextHref: state.user.activitiesNextHref,
    activitiesRequestInProcess: state.user.activitiesRequestInProcess,
    followers: state.user.followers,
    followersNextHref: state.user.followersNextHref,
    followersRequestInProcess: state.user.followersRequestInProcess,
    favorites: state.user.favorites,
    favoritesNextHref: state.user.favoritesNextHref,
    favoritesRequestInProcess: state.user.favoritesRequestInProcess
  };
}

export const DashboardContainer = connect(mapStateToProps, actions)(Dashboard);

Dashboard.propTypes = {
  pathname: React.PropTypes.string.isRequired,
  genre: React.PropTypes.string,
  currentUser: React.PropTypes.object,
  activeTrack: React.PropTypes.object,
  isPlaying: React.PropTypes.bool.isRequired,
  followings: React.PropTypes.array,
  activities: React.PropTypes.array,
  activitiesNextHref: React.PropTypes.string,
  activitiesRequestInProcess: React.PropTypes.bool.isRequired,
  followers: React.PropTypes.array,
  followersNextHref: React.PropTypes.string,
  followersRequestInProcess: React.PropTypes.bool.isRequired,
  favorites: React.PropTypes.array,
  favoritesRequestInProcess: React.PropTypes.bool.isRequired
};