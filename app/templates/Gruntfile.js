'use strict';

module.exports = function (grunt) {
  // load all grunt tasks

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  grunt.loadNpmTasks('grunt-bunt');

  grunt.initConfig({

    clean: {
      build: {
        src: 'build/**/*'
      }
    },

    // FIXME: auto-generate the ports for the generator here
    connect: {
      https: {
        options: {
          protocol: 'https',
          port: 1234,
          key: "-----BEGIN RSA PRIVATE KEY-----\nMIICXQIBAAKBgQDnjoY1wgPHv/DY5K9m8UjoKE2MaNeyW5E+khIgb1LH75CHEa0S\n1ugo5AGCG80WqAmjDIkqrjpArk8Tg6BgAcukFJnsMpJegL1sWc7gvyln0UneuIZq\nOoJCdH7tQo8Q49gjbb5tgR2qrGQPP/fpI3ft/gNPuwEz+J0trdtjmQfdLQIDAQAB\nAoGBAKLGiAYGSw4CGdb+e2cMOsooess3cFmLEQFBQcjXOQQfniO1A0t5E16bWYwS\n6wsAOTYLO+lq7LxHTINVRkn3OSTadIHzmj+CDy1wBZKrbklh08WWPIJtjKwN9svz\nxUB16KnBgKOiapQV01KBjhERskN73R6yOaYdzCZNhmnYn/6BAkEA+z2OQZa8cjAj\nMjP7avSqnHlId6FsNVOHZYyRHkZuuQLt4KcBKrr62czcMj9b25ZTr8OBZAxDKMU/\nelFaOKYgXQJBAOvxghfP/sOe50shHwCmNCGo5179SGFoVZPILGfvqEX3QHPckh4Y\nJUd5js1NwjGO0psmxna9U6Lrz9/UAwCvIxECQQDbceG+YkYJSwiDAip5OmmHMNxe\nOa3FSkc6KLRciFKP4QIbtmNrilQvRyOR9Ats2noQTKjI1XkXtGoEkehHELu1AkBS\nsDkfj02B0VbOBbWPzK/IfCFaMPoE6UPUnvqxElSu8JAuCsdKtLub6QYa/X1pUNyO\nc3BqfL+rAWnAz9SdkMOBAkA6ViDVeaq7YWN2lbmi3jqS+v/HGb4KVpew8XHlExeu\nmej1/PB7NLti0hpYZT4wiRcmBR1rslslWR7EbGb9ct23\n-----END RSA PRIVATE KEY-----\n",
          cert: "-----BEGIN CERTIFICATE-----\nMIICATCCAWoCCQC69t8jjAKGYDANBgkqhkiG9w0BAQUFADBFMQswCQYDVQQGEwJB\nVTETMBEGA1UECBMKU29tZS1TdGF0ZTEhMB8GA1UEChMYSW50ZXJuZXQgV2lkZ2l0\ncyBQdHkgTHRkMB4XDTEzMDgyMTEwNTEzOFoXDTEzMDkyMDEwNTEzOFowRTELMAkG\nA1UEBhMCQVUxEzARBgNVBAgTClNvbWUtU3RhdGUxITAfBgNVBAoTGEludGVybmV0\nIFdpZGdpdHMgUHR5IEx0ZDCBnzANBgkqhkiG9w0BAQEFAAOBjQAwgYkCgYEA546G\nNcIDx7/w2OSvZvFI6ChNjGjXsluRPpISIG9Sx++QhxGtEtboKOQBghvNFqgJowyJ\nKq46QK5PE4OgYAHLpBSZ7DKSXoC9bFnO4L8pZ9FJ3riGajqCQnR+7UKPEOPYI22+\nbYEdqqxkDz/36SN37f4DT7sBM/idLa3bY5kH3S0CAwEAATANBgkqhkiG9w0BAQUF\nAAOBgQC7fL/G8CD2cNck3fQxy1yAAKIFGYEYCp/qvDRPtkdKl+41iEQcqVMRc0LR\n2rT989fYMumSDnlllLEaRk1M3nKTXR8Lb8znTtCgiOkP5JTXmuXBAC/tEna6R8j6\nl9P0Ob/KcjrY9mnZn8+9N03QiA72HT5QsPyuqTEAKYGeC7nh0w==\n-----END CERTIFICATE-----\n",
          middleware: connectMiddleware
        }
      },
      http: {
        options: {
          port: 1235,
          middleware: connectMiddleware
        }
      }

    },

    watch: {
      scripts: {
        files: [
          'app/**',
        ],
        tasks: ['build'],
        options: {
          spawn: false,
        },
      }
    },

    stylus: {
      compile: {
        options: {
          urlfunc: 'embedurl', // use embedurl('test.png') in our code to trigger Data URI embedding
        },
        files: {
          'build/style.css': 'app/styles/*.styl'
        }
      }
    }

  });

  grunt.registerTask('build-assets', [
    'clean',
    'stylus',
  ]);

  grunt.registerTask('server', [
    'connect:https',
    'connect:http:keepalive',
  ]);

};

function connectMiddleware(connect, options) {
  return [
    connect.static(require('path').resolve('build')),
    connect.static(require('path').resolve('public')),
  ];
}
