import { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Picker } from 'react-native';

import SubmitButton from "./SubmitButton";

function Form() {
    const [alertType, setAlertType] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [addressGeolocation, setAddressGeolocation] = useState('');
    const [photo, setPhoto] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [city, setCity] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const handleFormSubmit = () => {
        console.log(`Alert Type: ${alertType}`);
        console.log(`Description: ${description}`);
        console.log(`Date: ${date}`);
        console.log(`Time: ${time}`);
        console.log(`AddressGeolocation: ${addressGeolocation}`);
        console.log(`Photo: ${photo}`);
        console.log(`FirstName: ${firstName}`);
        console.log(`Last Name: ${lastName}`);
        console.log(`Address Line: ${addressLine}`);
        console.log(`Zip Code: ${zipCode}`);
        console.log(`City: ${city}`);
        console.log(`Email: ${email}`);
        console.log(`Phone: ${phone}`);
    };
    
    return (
        <View style={StyleSheet.container}>
            <View style={styles.fieldset}>
                <Text>Type d'alerte</Text>
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={alertType}
                        onValueChange={(itemValue) => setAlertType(itemValue)}
                        style={StyleSheet.picker}
                    >
                        <Picker.Item label='Select an option' value="" />
                        <Picker.Item label='Voirie' value="" />
                        <Picker.Item label='Stationnement' value="" />
                        <Picker.Item label='Travaux' value="" />
                        <Picker.Item label='Eclairage public' value="" />
                        <Picker.Item label='Objects abandonnés' value="" />
                    </Picker>
                </View>

                <Text>Description</Text>
                <TextInput 
                    style={styles.champContainer}
                    placeholder="Description de l'alerte"
                    value={description}
                    onChangeText={(text) => setDescription(text)}
                    multiline
                />

                <Text>Date</Text>
                <TextInput
                    style={styles.champContainer}
                    placeholder="Date"
                    value={date}
                    onChangeText={(text) => setDate(text)}
                />

                <Text>Horaires</Text>
                <TextInput
                    style={styles.champContainer}
                    placeholder="Horaires"
                    value={time}
                    onChangeText={(text) => setTime(text)}
                />
            </View>

            <View style={styles.fieldset}>
                <Text>Adress</Text>
                <TextInput
                    style={styles.champContainer}
                    placeholder="Adress"
                    value={address}
                    onChangeText={(text) => setAddress(text)}
                />
            </View>

            <View style={styles.fieldset}>
                <Text>Photo</Text>
                <TextInput
                    style={styles.champContainer}
                    placeholder="Photo"
                    value={photo}
                    onChangeText={(text) => setPhoto(text)}
                />
            </View>

            <View style={styles.fieldset}>
                <TextInput
                style={styles.champContainer}
                placeholder="Nom"
                value={firstName}
                onChangeText={(text) => setName(text)}
                />

                <Text>Prenom</Text>
                <TextInput
                    style={styles.champContainer}
                    placeholder="Prenom"
                    value={lastName}
                    onChangeText={(text) => setLastName(text)}
                />

                <Text>Adress</Text>
                <TextInput
                    style={styles.champContainer}
                    placeholder="12 rue du Bonheur"
                    value={addressLine}
                    onChangeText={(text) => setAddressLine(text)}
                />

                <Text>Code Postal</Text>
                <TextInput
                    style={styles.champContainer}
                    placeholder="ex: 69007"
                    value={zipCode}
                    onChangeText={(text) => setZipCode(text)}
                />

                <Text>Ville</Text>
                <TextInput
                    style={styles.champContainer}
                    placeholder="Ville"
                    value={city}
                    onChangeText={(text) => setCity(text)}
                />

                <Text>Email</Text>
                <TextInput
                    style={styles.champContainer}
                    placeholder="example@mymail.com"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />

                <Text>Téléphone</Text>
                <TextInput
                    style={styles.champContainer}
                    placeholder="07 12 34 56 78"
                    value={phone}
                    onChangeText={(text) => setPhone(text)}
                />
            </View>

            <SubmitButton title="Submit" onPress={handleFormSubmit} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    fieldset: {
        flex: 1,
        shadowColor: 'rgba(0, 0, 0, 0.25)',
        shadowOffset: {
        width: 0,
        height: 10,
        },
        shadowOpacity: 1,
        shadowRadius: 14,
        elevation: 10, 
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: '#efeffe',
        borderRadius: 5,
        padding: 10,
    },
    champContainer: {
        borderWidth: 1, 
        borderColor: '#5f5ff5', 
        padding: 10,
    },
});