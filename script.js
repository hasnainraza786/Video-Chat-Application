let appID = "0ec8dcb53a354bdb824957e963bb9469"
        let uid = String(Math.floor(Math.random() * 232))
        console.log('this is uid',uid)
        let token = null
        let channelName = 'main'


        let inititaeRTM = async () =>{
            let client = await AgoraRTM.createInstance(appID)
            await client.login({uid, token})

            const channel = await client.createChannel(channelName)
            await channel.join()

            let form = document.getElementById('form')

            form.addEventListener('submit' , async (e) => {
                e.preventDefault()
                let message = e.target.message.value
            
                await channel.sendMessage({text:message + ': ' + uid, type:'text'})
                form.reset()
                

                handleMessage({text : message})

            } )


            channel.on('ChannelMessage', (message,peerId) => {
                console.log('Message:', message)
                handleMessage(message)
            })

            let handleMessage = async(message) => {
                let messages = document.getElementById('messages')
                let messageElement = `<p>${  message.text}</p>`
                messages.insertAdjacentHTML('beforeend', messageElement)
            }
        }

        inititaeRTM()