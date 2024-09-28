// +++ Original alchemize() Code +++
const planets = {0: 'Sun',
                 1: 'Mercury',
                 2: 'Venus',
                 3: 'Ascendant',
                 4: 'Mars',
                 5: 'Jupiter',
                 6: 'Saturn',
                 7: 'Uranus',
                 8: 'Neptune',
                 9: 'Pluto',
                 10: 'Moon'
                };

const signs = {'Aries': {'Start': 
                            {'Day': 21, 
                             'Month': 3, 
                             'Year': 2022},
                         'End': 
                            {'Day': 19, 
                             'Month': 4, 
                             'Year': 2022}},
               'Taurus':  {'Start': 
                            {'Day': 20, 
                             'Month': 4, 
                             'Year': 2022},
                          'End': 
                            {'Day': 20, 
                             'Month': 5, 
                             'Year': 2022}},
               'Gemini': {'Start': 
                            {'Day': 21, 
                             'Month': 5, 
                             'Year': 2022},
                          'End': 
                            {'Day': 20, 
                             'Month': 6, 
                             'Year': 2022}},
               'Cancer': {'Start': 
                            {'Day': 21, 
                             'Month': 6, 
                             'Year': 2022},
                          'End': 
                            {'Day': 22, 
                             'Month': 7, 
                             'Year': 2022}},
               'Leo': {'Start': 
                            {'Day': 23, 
                             'Month': 7, 
                             'Year': 2022},
                          'End': 
                            {'Day': 22, 
                             'Month': 8, 
                             'Year': 2022}},
               'Virgo': {'Start': 
                            {'Day': 23, 
                             'Month': 8, 
                             'Year': 2022},
                          'End': 
                            {'Day': 22, 
                             'Month': 9, 
                             'Year': 2022}},
               'Libra': {'Start': 
                            {'Day': 23, 
                             'Month': 9, 
                             'Year': 2022},
                          'End': 
                            {'Day': 22, 
                             'Month': 10, 
                             'Year': 2022}},
               'Scorpio': {'Start': 
                            {'Day': 23, 
                             'Month': 10, 
                             'Year': 2022},
                          'End': 
                            {'Day': 21, 
                             'Month': 11, 
                             'Year': 2022}},
               'Sagittarius': {'Start': 
                            {'Day': 22, 
                             'Month': 11, 
                             'Year': 2022},
                          'End': 
                            {'Day': 21, 
                             'Month': 12, 
                             'Year': 2022}},
               'Capricorn': {'Start': 
                            {'Day': 22, 
                             'Month': 12, 
                             'Year': 2022},
                          'End': 
                            {'Day': 19, 
                             'Month': 1, 
                             'Year': 2022}},
               'Aquarius': {'Start': 
                            {'Day': 20, 
                             'Month': 1, 
                             'Year': 2022},
                          'End': 
                            {'Day': 18, 
                             'Month': 2, 
                             'Year': 2022}},
               'Pisces': {'Start': 
                            {'Day': 19, 
                             'Month': 2, 
                             'Year': 2022},
                          'End': 
                            {'Day': 20, 
                             'Month': 3, 
                             'Year': 2022}}}

async function alchemize() {
  const birthday = {'Day': 23, 
                    'Month': 6, 
                    'Year': 1991}
  const birthtime = {};
  const new_signs = await determineSigns(birthday);
  console.log(new_signs);
}

async function determineSigns ( birthday ) {
  var user_signs = {'Aries': {'Planet': '',
                              'Decan': 0},
                    'Taurus': '',
                    'Gemini': '',
                    'Cancer': '',
                    'Leo': '',
                    'Virgo': '',
                    'Libra': '',
                    'Scorpio': '',
                    'Sagittarius': '',
                    'Capricorn': '',
                    'Aquarius': '',
                    'Pisces': ''};
  for (const [sign, date_range] of Object.entries(signs)) {
    //Sun
    if (birthday.Month === date_range.Start.Month || birthday.Month === date_range.End.Month) {
      if (birthday.Month === date_range.Start.Month) {
        if (birthday.Day >= date_range.Start.Day) {
          user_signs[sign] = 'Sun';
          //console.log(signString, user_signs.signString);
        }
      } else if (birthday.Month === date_range.End.Month) {
        if (birthday.Day <= date_range.End.Day) {
          user_signs[sign] = 'Sun';
          //console.log(signString, user_signs.signString);
        }
      }
    }
  };
  return user_signs
}