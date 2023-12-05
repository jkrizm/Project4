import json

playlist_data =[]
playlist_files = ['JSON Files/best70s80s.json','JSON Files/classic_oldies_mix1.json', 'JSON Files/classic_oldies2.json', 'JSON Files/the80s_party.json', 'JSON Files/the90s_hits.json']
full_str = ''
j = 0
for i in range(len(playlist_files)):
    curr_file = open(playlist_files[i])
    curr_data = json.load(curr_file)
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
        if j % 100 == 1 and j != 1:
            print(j)
            full_str = full_str + "\n\nBATCH" + str((j-1)/100) + '\n'
        full_str = full_str + id_str
        playlist_data.append(song_dict)
        j += 1

with open("playlist_dict.json", "w") as outfile:
    json.dump(playlist_data, outfile)

with open('curl_ids.txt', 'w') as f:
    f.write(full_str)