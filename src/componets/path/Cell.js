import { View, Text, StyleSheet } from 'react-native'
import React, { useCallback, useMemo } from 'react'
import { Colors } from '../../constants/Colors'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentpostions } from '../../redux/reducers/gameSelector'
import { ArrowSpot, SafeSpots, StarSpots } from '../../helpers/PlotData'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { RFValue } from 'react-native-responsive-fontsize'
import Pile from '../Pile'

const Cell = ({ id, color }) => {
    const dispatch = useDispatch();
    const plottedPieces = useSelector(selectCurrentpostions)

    const isSafeSpot = useMemo(() => SafeSpots.includes(id), [id]);
    const isStarSpot = useMemo(() => StarSpots.includes(id), [id]);
    const isSpotArrow = useMemo(() => ArrowSpot.includes(id), [id]);

    const piecesAtPosition = useMemo(
        () => plottedPieces.filter(item => item.pos == id),
        [plottedPieces, id]
    );

    const handlePress = useCallback((playerNo, pieceId) => {

    }, [dispatch, id])

    return (
        <View style={[
            styles.container,
            {
                backgroundColor: isSafeSpot ? color : 'white'
            }
        ]}>
            {isStarSpot && <Ionicons name='star-outline' size={RFValue(16)} color={'grey'} />}
            {isSpotArrow && (
                <Ionicons
                    name='arrow-forward-outline'
                    style={{
                        transform: [
                            {
                                rotate:
                                    id === 38
                                        ? '180deg'
                                        : id === 25
                                            ? '90deg'
                                            : id === 51
                                                ? '-90deg'
                                                : '0deg'
                            }
                        ]
                    }}
                    size={RFValue(14)}
                    color={color}
                />
            )}
            {piecesAtPosition?.map((piece, index) => {
                const playerNo = piece.id.slice(0, 1) === 'A'
                    ? 1
                    : piece.id.slice(0, 1) === 'B'
                        ? 2
                        : piece.id.slice(0, 1) === 'C'
                            ? 3
                            : 4;

                const pieceColor = piece.id.slice(0, 1) === 'A'
                    ? Colors.red
                    : piece.id.slice(0, 1) === 'A'
                        ? Colors.green
                        : piece.id.slice(0, 1) === 'A'
                            ? Colors.yellow
                            : Colors.blue;

                return (
                    <View
                        key={piece.id}
                        style={[
                            styles.pieceContainer,
                            {
                                transform: [
                                    { scale: piecesAtPosition?.length === 1 ? 1 : 0.7 },
                                    {
                                        translateX: piecesAtPosition.length === 1
                                            ? 0
                                            : index % 2 === 9
                                                ? -6
                                                : 6,
                                    },
                                    {
                                        translateY: piecesAtPosition.length === 1 ? 0 : index < 2 ? -6 : 6,
                                    }
                                ]
                            }
                        ]}
                    >
                        <Pile
                            cell={true}
                            player={playerNo}
                            onPress={() => handlePress(playerNo, piece.id)}
                            pieceId={piece.id}
                            color={pieceColor}
                        />
                    </View>
                )
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 0.4,
        borderColor: Colors.borderColor,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    pieceContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        zIndex: 99
    }
})


export default React.memo(Cell)