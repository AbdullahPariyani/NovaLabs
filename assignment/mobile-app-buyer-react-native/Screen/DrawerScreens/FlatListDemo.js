

// Import React and Component
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ListItem, Icon, Button } from 'react-native-elements';



const FlatListDemo = () => {

    const [users, usersSet] = React.useState([]);

    React.useEffect(() => {
        async function fetchUsers() {
            const fullResponse = await fetch('https://node-api-nova.herokuapp.com/seller/list-seller-with-slot');
            const responseJson = await fullResponse.json();
            usersSet(responseJson.data);
            console.log(fullResponse);
        }

        fetchUsers();
    }, []);

    return (

        <View>
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


export default FlatListDemo;
