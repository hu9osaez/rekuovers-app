import React from 'react';
import { FlatList, View } from 'react-native';
import { List, ListItem } from 'react-native-elements';

import isEmpty from 'lodash/isEmpty';
import { connect } from 'react-redux';
import { api, fetchNewestCovers } from '@core/api';

class FeedScreen extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isLoadingNextPage: false,
      nextPageUrl: null,
      refreshing: false,
    };
  }

  componentDidMount() {
    this.fetchCovers();
  };

  fetchCovers = async () => {
    const result = await fetchNewestCovers();

    if(result.success) {
      const hasNextPage = !isEmpty(result && result.pagination && result.pagination.links.next);

      this.setState({
        nextPageUrl: hasNextPage ? result.pagination.links.next : null,
        data: result.data,
        refreshing: false,
      });
    }
    else {
      // @TODO: Do something if the request fail
    }
  };

  fetchNextPage = async () => {
    this.setState({ isLoadingNextPage: true });

    if(this.state.nextPageUrl === null) {
      return;
    }

    const result = await api.getJson(this.state.nextPageUrl);

    if(result.success) {
      const hasNextPage = !isEmpty(result && result.pagination && result.pagination.next);

      this.setState({
        nextPageUrl: hasNextPage ? result.pagination.next : null,
        data: [...this.state.data, ...result.data],
        refreshing: false,
      });
    }
    else {
      // @TODO: Do something if the request fail
    }

    this.setState({ isLoadingNextPage: false });
  };


  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          backgroundColor: "#CED0CE",
        }}
      />
    );
  };

  render() {
    const { navigation } = this.props;
    return(
      <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <ListItem
              title={item.name}
              containerStyle={{ borderBottomWidth: 0 }}
              onPress={() => navigation.navigate('CoverDetails', {cover: item})}
            />
          )}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={this.renderSeparator}
          refreshing={this.state.refreshing}
          onEndReached={this.fetchNextPage}
          onEndReachedThreshold={0.6}
        >

        </FlatList>
      </List>
    );
  }
}


export default connect()(FeedScreen);
