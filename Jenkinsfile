def notifySlackError() {
    buildStatus = 'FAILURE'
    buildResultUrl = "${env.BUILD_URL}"
    def msg = "${buildStatus}: `${env.JOB_NAME}` #${env.BUILD_NUMBER}:\n${buildResultUrl}"
    slackSend (
        color: '#FF9FA1',
        message: msg
    )
}

pipeline {
  agent {
    dockerfile true
  }
  environment {
        CI = 'true'
  }
  stages {
    stage('NPM Build') {
      environment {
      // Override HOME to WORKSPACE
        HOME = "${WORKSPACE}"
      // or override default cache directory (~/.npm)
        NPM_CONFIG_CACHE = "${WORKSPACE}/.npm"
      }
      steps {
        sh 'npm ci'
      }
    }
    stage('Test') {
      steps {
        sh 'npm run test:unit'
      }
    }
    stage('Lint') {

      steps {
        sh 'npm run lint'
      }
    }
    stage('Build') {
      steps {
        sh 'npm run build'
      }
    }
  }
  post{
      failure{
          notifySlackError()
      }
  }
}
