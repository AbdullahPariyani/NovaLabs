

// Import React and Component
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

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

        <View style={{ flex: 1, padding: 2 }}>
            {users.map((user) => (
                <View style={{
                    flex: 1
                }}>
                    <Text key={user.seller.id}>
                        {user.seller.email}
                    </Text>
                    <View>
                        {user.slots.map((slots) => (
                            <View>
                                <Text key={slots._id}>
                                    {slots.timeSlotValue} : {slots.isTimeSlotBooked && slots.isBookedForRequest ? 'Accepted' : 'Rejected'}
                                </Text>
                            </View>
                        ))}
                    </View>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 8,
        backgroundColor: "aliceblue",
    },
    box: {
        width: '100%',
        marginTop: '5%',
        padding: '5%',
    },
    row: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    button: {
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderRadius: 4,
        backgroundColor: "oldlace",
        alignSelf: "flex-start",
        marginHorizontal: "1%",
        marginBottom: 6,
        minWidth: "48%",
        textAlign: "center",
    },
    selected: {
        backgroundColor: "coral",
        borderWidth: 0,
    },
    buttonLabel: {
        fontSize: 12,
        fontWeight: "500",
        color: "coral",
    },
    selectedLabel: {
        color: "white",
    },
    label: {
        textAlign: "center",
        marginBottom: 10,
        fontSize: 24,
    },
});


export default FlatListDemo;
