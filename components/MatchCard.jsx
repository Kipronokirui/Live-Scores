import { router } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function MatchCard({ match }) {
  const handlePress = () => {
    router.push(`/match/${match.id}`);
  };

  const getStatusStyle = () => {
    switch (match.status) {
      case 'Match Finished':
        return styles.statusFinished;
      case 'First Half':
      case 'Second Half':
        return styles.statusLive;
      case 'Not Started':
        return styles.statusNotStarted;
      default:
        return styles.statusNotStarted;
    }
  };

  return (
    <TouchableOpacity 
      style={styles.card}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <View style={[styles.statusBadge, getStatusStyle()]}>
        <Text style={styles.statusText}>{match.status}</Text>
      </View>

      <View style={styles.matchContent}>
        <View style={styles.teamContainer}>
          <Text style={styles.teamLogo}>{match.homeTeam.logo}</Text>
          <Text style={styles.teamName} numberOfLines={1}>
            {match.homeTeam.name}
          </Text>
        </View>

        <View style={styles.scoreContainer}>
          <Text style={styles.score}>
            {match.homeScore} - {match.awayScore}
          </Text>
          {match.time && <Text style={styles.time}>{match.time}</Text>}
          {match.date && <Text style={styles.date}>{match.date}</Text>}
        </View>

        <View style={styles.teamContainer}>
          <Text style={styles.teamLogo}>{match.awayTeam.logo}</Text>
          <Text style={styles.teamName} numberOfLines={1}>
            {match.awayTeam.name}
          </Text>
        </View>
      </View>

      {match.status === 'Match Finished' && (
        <Text style={styles.finalTime}>FT</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statusBadge: {
    alignSelf: 'center',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: 12,
  },
  statusNotStarted: {
    backgroundColor: '#5C6B7A',
  },
  statusLive: {
    backgroundColor: '#5C6B7A',
  },
  statusFinished: {
    backgroundColor: '#E53935',
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  matchContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  teamContainer: {
    flex: 1,
    alignItems: 'center',
  },
  teamLogo: {
    fontSize: 48,
    marginBottom: 8,
  },
  teamName: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    color: '#1A1A1A',
  },
  scoreContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  score: {
    fontSize: 36,
    fontWeight: '700',
    color: '#4A5568',
  },
  time: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4A5568',
    marginTop: 4,
  },
  date: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 4,
  },
  finalTime: {
    textAlign: 'center',
    marginTop: 12,
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '600',
  },
});
