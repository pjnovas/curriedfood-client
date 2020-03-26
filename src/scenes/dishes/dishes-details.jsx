import React from 'react';
import { StyleSheet, View } from 'react-native';
import { /* Button,*/ Layout, Text } from '@ui-kitten/components';
import { useSafeArea } from 'react-native-safe-area-context';
import { Toolbar } from '../../components/toolbar';
import { ImageOverlay } from '../../components/image-overlay';
import { ProgressBar } from '../../components/progress-bar';

export const DishDetailsScreen = (props) => {
  const { dish } = props.route.params;
  const insets = useSafeArea();

  return (
    <React.Fragment>
      <ImageOverlay
        style={[styles.appBar, { paddingTop: insets.top }]}
        source={require('../../assets/image-background.jpeg')}
      >
        <Toolbar appearance="control" onBackPress={props.navigation.goBack} />
      </ImageOverlay>
      <Layout style={styles.container}>
        <View style={styles.detailsContainer}>
          <Text style={styles.title} category="h4">
            {dish.title}
          </Text>
          <ProgressBar
            style={styles.progressBar}
            progress={dish.duration}
            text={`${dish.duration} min`}
          />
          <Text style={styles.title}>{dish.recipe}</Text>
        </View>
        {/* <Button onPress={props.navigation.goBack}>COMPLETE</Button> */}
      </Layout>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1
  },
  container: {
    flex: 1,
    paddingVertical: 4,
    paddingHorizontal: 16
  },
  detailsContainer: {
    flex: 1
  },
  appBar: {
    height: 192
  },
  title: {
    marginVertical: 4
  },
  progressBar: {
    width: '80%',
    marginVertical: 16
  }
});