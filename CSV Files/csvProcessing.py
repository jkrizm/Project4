import pandas as pd

songs_df = pd.read_csv('Final CSV files & Processing Code/playlist_dict.csv')
atrributes_df = pd.read_csv('CSV Files/audio_features_1.csv')
attributes_files = ['CSV Files/audio_features_2.csv', 'CSV Files/audio_features_3.csv', 'CSV Files/audio_features_4.csv', 'CSV Files/audio_features_5.csv', 'CSV Files/songs1950s.csv', 'CSV Files/songs1960s.csv', 'CSV Files/songs1970s.csv', 'CSV Files/songs1980s.csv', 'CSV Files/songs1990s.csv', 'CSV Files/songs2000s.csv']
for i in range(len(attributes_files)):
    curr_df = pd.read_csv(attributes_files[i])
    atrributes_df = atrributes_df.append(curr_df)
complete_df = pd.merge(songs_df, atrributes_df, on='id')
complete_df.to_csv('final.csv', index=False)