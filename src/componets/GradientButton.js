import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize'
import LinearGradient from 'react-native-linear-gradient'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { playSound } from '../helpers/SoundUtility'

const iconsSize = RFValue(20)

const GradientButton = ({ title, onPress, iconColor = '#d5be3e' }) => {
    return (
        <View style={styles.mainContainer}>
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                    playSound('ui');
                    onPress()
                }}
                style={styles.buttonContainer}
            >
                <LinearGradient
                    colors={['#4c669f', '#3b5998', '#192f6a']}
                    style={styles.button}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                >
                    {
                        title == " RESUME" ?
                            <MaterialIcons name='play-arrow' color={iconColor} size={iconsSize} />
                            : title == "NEW GAME" ?
                                <MaterialIcons name='play-circle' color={iconColor} size={iconsSize} />
                                : title == "VS CPU" ?
                                    <MaterialIcons name='airplay' color={iconColor} size={iconsSize} />
                                    : title == "HOME" ?
                                        <MaterialIcons name='home' color={iconColor} size={iconsSize} />
                                        :
                                        <MaterialIcons name='person-4' color={iconColor} size={iconsSize} />


                    }
                    <Text style={styles.buttonText}>{title}</Text>
                </LinearGradient>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#000',
        marginVertical: 10,
    },
    buttonContainer: {
        borderWidth: 3,
        borderRadius: 10,
        elevation: 8,
        backgroundColor: 'white',
        shadowColor: '#d5be3e',
        shadowOpacity: 0.8,
        shadowOffset: { width: 1, height: 1 },
        shadowRadius: 10,
        borderColor: '#d5be3e',
        width: 220,
    },
    buttonText: {
        color: 'white',
        fontSize: RFValue(16),
        width: '70%',
        textAlign: 'left',
        fontFamily: 'Philosophoer-Bold'
    },
    button: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#222',
        flexDirection: 'row',
        alignItems: 'left',
        justifyContent: 'center',
        gap: 20,
    }
})

export default GradientButton