

![Metapod Icon](/_assets/metapodicon.png?raw=true "MetaPod")

# MetaPod

Simple docker based app created to help debug on cloud providers.
Rest API applications made with node that will help you know what is happening with you environment.

## Getting Started

Supports:

###System info Based on Node module "systeminformation". 
- freemem
- homedir
- hostname
- platform
- release
- totalmem


###Docker containers lister:
- by name


###Cloud Provider Metadata based on Link-local:[LINK-LOCAL](https://en.wikipedia.org/wiki/Link-local_address)
- Node Hostname
- public/local Ip
- Credential Exposure checker



 

Metadata Cloud Service API:

 Amazon Web Services (AWS) 
 ![Status](https://img.shields.io/badge/Status-Working-green)  
 `http://169.254.169.254/latest/meta-data/ami-id`                            
 https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-metadata.html            

 Google Cloud           
![Status](https://img.shields.io/badge/Status-InProgress-yellow)
`http://metadata.google.internal/computeMetadata/v1/instance/machine-type`  
  https://cloud.google.com/compute/docs/storing-retrieving-metadata                         

 Microsoft Azure        
![Status](https://img.shields.io/badge/Status-InProgress-yellow)
`http://169.254.169.254/metadata/instance?api-version=2017-12-01`           
  https://docs.microsoft.com/en-us/azure/virtual-machines/windows/instance-metadata-service 
 
 DigitalOcean           
![Status](https://img.shields.io/badge/Status-InProgress-yellow)
`http://169.254.169.254/metadata/v1/`                                       
  https://www.digitalocean.com/docs/droplets/resources/metadata/                            

 OpenStack              
![Status](https://img.shields.io/badge/Status-InProgress-yellow)
`http://169.254.169.254/openstack/latest`
 https://blogs.vmware.com/openstack/introducing-the-metadata-service/                      
 
 Rancher (Kubernetes)   
 ![Status](https://img.shields.io/badge/Status-InProgress-yellow)    
`http://rancher-metadata/2015-07-25/`
https://rancher.com/introducing-rancher-metadata-service-for-docker/                      



### The Application



![Graph](/_assets/graphdio.PNG?raw=true "Graph")



####  Environment Variables

SERVER_PORT (default 4499)
etc

####  Kubernetes

You can pull it and use it on your deployment.yaml.

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: metapod
  # namespace: metapod
spec:
  replicas: 1
  selector:
    matchLabels:
      app: metapod
  template:
    metadata:
      labels:
        app: metapod
    spec:
      containers:
      - name: metapod
        image: b4lddocker/metapod:latest
        command: ["npm","run","metapod"]
        imagePullPolicy: Always
        ports:
          - containerPort: 4499 #Container/Application
            name: http
        volumeMounts:
          - name: dockersock
            mountPath: /var/run/docker.sock
      volumes:
         - name: dockersock
           hostPath:
              path: /var/run/docker.sock
---
apiVersion: v1
kind: Service
metadata:
  name: metapod-service
  # namespace: metapod
  labels:
    app: metapod
spec:
  selector:
    app:  metapod
  type: NodePort
  ports:
  - name: http
    port: 4499 #Same the Ingress/Loadbalancer
    targetPort: 4499 #Bind to container/Application




```
#### Solo Docker Usage Capabilities

As expected, cloud metadata cannot be displayed when using solo containers method.


In order to use it with docker, the container must know the docker socket, so it is mandatory that you map it with the volume.

```bash
docker run -d --name metapod -p 4499:4499 -v /var/run/docker.sock:/var/run/docker.sock b4lddocker/metapod:latest
```

---

NOTE: If you are on Windows Docker-for-Desktop - you may whant to map like this instead.

```bash
docker run -d --name metapod -p 4499:4499 -v //var/run/docker.sock:/var/run/docker.sock b4lddocker/metapod:latest

```

## Built With

* [Node.js](https://nodejs.org/en/) - Base Application Framework

## Contributing

Open source project ready for contibution.

## Docker Images Versioning


**Release 1.1.0** 
![Version](https://img.shields.io/badge/Version-V1.x-blue) 
![Maintenance](https://img.shields.io/badge/Maintenance-false-yellow)


------


## Authors

* **b4ld** - *Initial work* - [b4ld](https://github.com/b4ld)


## License

This project is licensed under the MIT License
