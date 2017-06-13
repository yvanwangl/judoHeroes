import http from 'http';
import assert from 'assert';

import {server, port} from '../server.js';

const request = require('supertest').agent(server.listen(port));

describe('Example Node Server', ()=>{
    it('should return 200', async ()=>{
        let res = await request
                            .get('/')
                            .then(response => {
                                assert(200, response.status)
                            });
        
    })
});