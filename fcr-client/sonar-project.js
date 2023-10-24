const SonarqubeScanner = require ('sonarqube-scanner');

SonarqubeScanner({
    serverUrl : 'http://185.192.96.18:31265/',
    options : {
        'sonar.projectDescription': 'fcr-client Sonar Analysis ',
        'sonar.projectName':'fcr-client',
        'sonar.projectKey':'fcr-client',
        'sonar.login':'sqp_39675e1deb59f412a91fdcc94af260e81c3fa526',
        'sonar.projectVersion':'1.0',
        'sonar.language':'js',
        'sonar.sourceEncoding':'UTF-8',
        'sonar.sources':'.',
         }
},()=>{});
