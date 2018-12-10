const Nginx = require('@bizzabo/nginx');
const yargs = require('yargs');
const { join, resolve } = require('path');

(async () => {
    const {
        argv: { namespace }
    } = yargs
        .alias('n', 'namespace')
        .describe('namespace', 'Kubernetes namespace')
        .demandOption(['namespace']);

    const projectName = '<%= serviceName %>';
    const hostPrefix = '<%= serviceHost %>';
    const cluster = 'ext2.clusters.bizzabo.com';
    const staticRoot = resolve(join(__dirname, 'app/dist/static'));

    const nginx = new Nginx({
        namespace,
        configmap: `${namespace}-${projectName}-nginx-conf`
    });

    await nginx.createCertificates();
    await nginx.createConfig({
        name: projectName,
        sources: [
            { type: 'file', value: 'variables.nginx.inc' },
            {
                type: 'variables',
                value: {
                    conf_nginx_root: staticRoot
                }
            },
            { type: 'file', value: 'listen_https.nginx.inc' },
            { type: 'file', value: 'base.nginx.inc' }
        ]
    });

    await nginx.removeHostname(`*-${hostPrefix}.${cluster}`);
    await nginx.createHostname(`${namespace}-${hostPrefix}.${cluster}`);
    await nginx.reload();
})().catch(e => {
    console.error(e.stack || e);
    process.exit(1);
});
