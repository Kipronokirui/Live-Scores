import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

export default function StandingTab({
    dummyLeagueData,
  filter,
  setFilter,
}) {
  return (
    <View>
      <Text style={styles.sectionTitle}>STANDING</Text>

      <View style={styles.filterContainer}>
        {(['ALL', 'HOME', 'AWAY']).map((f) => (
          <TouchableOpacity
            key={f}
            style={[styles.filterButton, filter === f && styles.filterButtonActive]}
            onPress={() => setFilter(f)}>
            <Text
              style={[
                styles.filterButtonText,
                filter === f && styles.filterButtonTextActive,
              ]}>
              {f}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.standingTable}>
        <View style={styles.standingHeader}>
          <Text style={styles.standingHeaderTeam}>Premier League</Text>
          <Text style={styles.standingHeaderStat}>MP</Text>
          <Text style={styles.standingHeaderStat}>+/-</Text>
          <Text style={styles.standingHeaderStat}>GD</Text>
          <Text style={styles.standingHeaderStat}>PTS</Text>
        </View>

        {dummyLeagueData.standings.map((team, index) => (
          <View key={team.id} style={styles.standingRow}>
            <View style={styles.standingTeamCell}>
              <Text style={styles.standingPosition}>{index + 1}</Text>
              <Image source={{ uri: team.logo }} style={styles.teamLogo} />
              <Text style={styles.teamName}>{team.name}</Text>
            </View>
            <Text style={styles.standingStat}>{team.played}</Text>
            <Text style={styles.standingStat}>{team.goalDiff}</Text>
            <Text style={styles.standingStat}>{team.goalDifference}</Text>
            <Text style={styles.standingPoints}>{team.points}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#3D4F6D',
    textAlign: 'center',
    marginVertical: 20,
    letterSpacing: 1,
  },
  filterContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: '#E8EBF0',
    borderRadius: 12,
    padding: 4,
  },
  filterButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 10,
  },
  filterButtonActive: {
    backgroundColor: '#5B6B8E',
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  filterButtonTextActive: {
    color: '#fff',
  },
  standingTable: {
    marginHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
  },
  standingHeader: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#F5F5F5',
  },
  standingHeaderTeam: {
    flex: 1,
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
  },
  standingHeaderStat: {
    width: 50,
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
  },
  standingRow: {
    flexDirection: 'row',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    alignItems: 'center',
  },
  standingTeamCell: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  standingPosition: {
    width: 20,
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  teamLogo: {
    width: 28,
    height: 28,
    marginHorizontal: 8,
  },
  teamName: {
    fontSize: 15,
    fontWeight: '500',
    color: '#000',
  },
  standingStat: {
    width: 50,
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  standingPoints: {
    width: 50,
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    textAlign: 'center',
  },
});