import React from 'react';
import { StyleSheet, View } from 'react-native';
import { RoundedButton } from '../../components/RoundedButton';

export function Timing({ changeTime }) {
	const TimeSelector = ({ time }) => (
		<View style={styles.timingButton}>
			<RoundedButton size={75} title={time} onPress={() => changeTime(time)} />
		</View>
	);

	return (
		<>
			<TimeSelector time={10} />
			<TimeSelector time={15} />
			<TimeSelector time={20} />
		</>
	);
}

const styles = StyleSheet.create({
	timingButton: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	}
});
