

// Import React and Component
import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { ListItem, Button } from 'react-native-elements';
import Loader from '../Components/Loader';



const HomeScreen = () => {

  const [users, usersSet] = React.useState([]);
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    async function fetchUsers() {
      setLoading(true);
      const fullResponse = await fetch('https://node-api-nova.herokuapp.com/seller/list-seller-with-slot');
      const responseJson = await fullResponse.json();
      usersSet(responseJson.data);
      setLoading(false);
      console.log(fullResponse);
    }

    fetchUsers();
  }, []);

  return (
    <SafeAreaView>

      <ScrollView>
        <View>
          <Loader loading={loading} />
          {
            users.map((user, i) => (
              <ListItem key={user.seller._id} bottomDivider>
                {/* <Avatar source={{ uri: l.avatar_url }} /> */}
                <ListItem.Content bottomDivider>
                  <ListItem.Title style={styles.title}>{user.seller.firstName} {user.seller.lastName}</ListItem.Title>
                  <ListItem.Subtitle>{user.seller.email}</ListItem.Subtitle>
                  {
                    user.slots.map((slot, i) => (
                      <View style={{ flexDirection: 'row', marginTop: 10 }} key={slot._id}>
                        <View style={{ marginRight: 10 }} bottomDivider>
                          <Text>{slot.timeSlotValue}</Text>
                        </View>
                        <View bottomDivider>
                          <Button title={slot.timeSlotValue} onPress={() => { }}></Button>
                        </View>
                      </View>
                    ))
                  }

                </ListItem.Content>
              </ListItem>
            ))
          }

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

  title: {
    textTransform: 'capitalize'
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',

  },
  button: {
    paddingTop: '10px'
  }
});


export default HomeScreen;
