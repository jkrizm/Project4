import json
import pandas as pd

playlist_data =[]
playlist_files = ['JSON Files/Playlists/the1990s.json', 'JSON Files/Playlists/the50s_1.json', 'JSON Files/Playlists/the50s_2.json', 'JSON Files/Playlists/the50s_3.json', 'JSON Files/Playlists/the50s_5.json', 'JSON Files/Playlists/the50s_6.json', 'JSON Files/Playlists/the50s_8.json', 'JSON Files/Playlists/the50s_9.json', 'JSON Files/Playlists/the90s_1.json', 'JSON Files/Playlists/the90s_2.json', 'JSON Files/Playlists/the90s_3.json', 'JSON Files/Playlists/the00s_1.json', 'JSON Files/Playlists/the00s_2.json', 'JSON Files/Playlists/the00s_3.json', 'JSON Files/Playlists/the00s_4.json', 'JSON Files/Playlists/the00s_5.json', 'JSON Files/Playlists/1960s_deep_cuts.json', 'JSON Files/Playlists/1960s_underground.json', 'JSON Files/Playlists/the70s_hits_2.json', 'JSON Files/Playlists/the70s_hits_3.json', 'JSON Files/Playlists/the80s_hits_1.json', 'JSON Files/Playlists/the80s_hits_2.json', 'JSON Files/Playlists/best70s80s.json','JSON Files/Playlists/classic_oldies_mix1.json', 'JSON Files/Playlists/classic_oldies2.json', 'JSON Files/Playlists/the80s_party.json', 'JSON Files/Playlists/the90s_hits.json', 'JSON Files/Playlists/the1950s.json', 'JSON Files/Playlists/the1960s.json', 'JSON Files/Playlists/the1970s.json', 'JSON Files/Playlists/the1980s.json', 'JSON Files/Playlists/the2000s.json']
full_str = ''
for i in range(len(playlist_files)):
    full_str += '\n' + playlist_files[i] + '\n'
    print(playlist_files[i])
    curr_file = open(playlist_files[i])
    curr_data = json.load(curr_file)
    print(len(curr_data))
    id_str = ''
    for item in curr_data['tracks']['items']:
        song_dict = {}
        curr_track = item['track']
        id_str = curr_track['id'] + ","
        song_dict['id'] = curr_track['id']
        song_dict['song_name'] = curr_track['name']
        song_dict['artist'] = curr_track['artists'][0]['name']
        song_dict['pic_url'] = curr_track['album']['images'][0]['url']
        song_dict['preview_url'] = curr_track['preview_url']
        if curr_track['album']['release_date_precision'] != 'year':
            song_dict['release_year']  = curr_track['album']['release_date'].split('-')[0]
        else:
            song_dict['release_year'] = curr_track['album']['release_date']
        full_str = full_str + id_str
        playlist_data.append(song_dict)
    full_str += '\n'

with open("playlist_dict.json", "w") as outfile:
    json.dump(playlist_data, outfile)

with open('curl_ids.txt', 'w') as f:
    f.write(full_str)