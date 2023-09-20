import { useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import Button from '../components/Button';

const Logo = require('../assets/images/logo.png');

export default function Index() {
    return (
        <View style={styles.container}>
            <Image
                source={Logo}
                style={styles.logo}>
            </Image>
            <Text style={styles.title}>Bienvenue à Simplon
                <Text style={styles.boldText}>Ville</Text>
            </Text>
            <Text style={styles.paragraph}>Simplon<Text style={styles.boldText}>Ville</Text> se soucie de la sécurité de tous ! Vous pouvez être un acteur clé et contribuer à la sécurité de notre ville en signalant rapidement tout incident ou problème.</Text>
            <Text style={styles.paragraph}>Ensemble, faisons la différence !</Text>
            <View>
                <Button label="Alertez-nous" theme="contact"></Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    logo: {
        width: '15%',
        height: '15%',
        resizeMode: 'cover',
        marginTop: 50,
        tintColor: '#5f5ff5',
        borderRadius: 5,
    },
    title: {
        color: '#b2b2b2',
        fontSize: 25,
        fontWeight: '300',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 40,
    },
    boldText: {
        fontWeight: '500',
    },
    paragraph: {
        color: '#b2b2b2',
        fontSize: 18,
        fontWeight: '300',
        marginTop: 30,
        marginHorizontal: 10,
        justifyContent: 'center',
        textAlign: 'center',
    },
})
