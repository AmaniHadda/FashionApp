const SonarqubeScanner = require ('sonarqube-scanner');

SonarqubeScanner({
    serverUrl : 'http://185.192.96.18:31265/',
    options : {
        'sonar.projectDescription': 'fcr-backend Sonar Analysis ',
        'sonar.projectName':'fcr-backend',
        'sonar.projectKey':'fcr-backend',
        'sonar.login':'sqp_e2a898f2618ecd59d20f232cfa56d7a57461bb9e',
        'sonar.projectVersion':'1.0',
        'sonar.language':'js',
        'sonar.sourceEncoding':'UTF-8',
        'sonar.sources':'.',
         }
},()=>{});


//             const SonarqubeScanner = require ('sonarqube-scanner');

// SonarqubeScanner({
//     serverUrl : 'http://185.192.96.18:31238/',
//     options : {
//         'sonar.projectDescription': 'Cliclaim Sonar Analysis wbe admin',
//         'sonar.projectName':'cliclaim-web-admin',
//         'sonar.projectKey':'cliclaim-web-admin',
//         'sonar.login':'sqp_c4051d0cbfdd5710d21e3a2f2313dfe23eedeb52',
//         'sonar.projectVersion':'1.0',
//         'sonar.language':'js',
//         'sonar.sourceEncoding':'UTF-8',
//         'sonar.sources':'.',
//     }
// },()=>{});
