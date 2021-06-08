

// Import React and Component
import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { ListItem, Button } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import Loader from '../Components/Loader';



const HomeScreen = () => {

  const [users, usersSet] = React.useState([]);
  const [loading, setLoading] = useState(false);
  const [buyerId, setBuyerId] = useState(null);

  async function bookAppointment(slot) {
    setLoading(true);
    let dataToSend = { _id: slot._id, sellerId: slot.sellerId, timeSlotID: slot.timeSlotID, buyerId: buyerId };

    let formBody = [];
    for (let key in dataToSend) {
      let encodedKey = encodeURIComponent(key);
      let encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');
    console.log(formBody, dataToSend)

    fetch('https://node-api-nova.herokuapp.com/buyer/book-appointment', {
      method: 'POST',
      body: formBody,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' }
    }).then((response) => response.json())
      .then((responseJson) => {
        setLoading(false);
        fetchUsers();
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });
  }

  async function fetchUsers() {
    setLoading(true);
    const fullResponse = await fetch('https://node-api-nova.herokuapp.com/seller/list-seller-with-slot');
    const responseJson = await fullResponse.json();
    usersSet(responseJson.data);
    await AsyncStorage.getItem('user_id').then((value) => setBuyerId(value));
    setLoading(false);
    console.log(fullResponse);
  }

  React.useEffect(() => fetchUsers(), []);

  return (
    <SafeAreaView>

      <ScrollView>
        <View>
          <Loader loading={loading} />
          {
            users.map((user, i) => (
              <ListItem key={user.seller._id} bottomDivider>
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
                          {
                            slot.isTimeSlotBooked && slot.isBookedForRequest ?
                              <Button disabled='true' title='Booked' key={slot.sellerId + slot._id}></Button>
                              : [
                                !slot.isTimeSlotBooked && slot.isBookedForRequest
                                  ?
                                  <Button disabled='true' title='Requested' key={slot.sellerId + slot.sellerId}></Button>
                                  :
                                  <Button title='Available' onPress={() => { bookAppointment(slot) }} key={slot._id + slot.sellerId}></Button>
                              ]
                          }
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
    </SafeAreaView >
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
