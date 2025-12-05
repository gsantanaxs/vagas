const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);


app.get('/', (req, res) => {
  res.json({ mensagem: 'API rodando!' });
});


app.get('/vagas', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('vagas')
      .select('*');
    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
});


app.get('/vagas/:id', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('vagas')
      .select('*')
      .eq('id', req.params.id)
      .single();
    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
});


app.post('/vagas/:id', async (req, res) => {
  try {
    const { titulo, area, salario, remoto } = req.body;
    const { data, error } = await supabase
      .from('vagas')
      .insert([{ titulo, area, salario, remoto}])
      .select();
    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
});


app.put('/vagas/:id', async (req, res) => {
  try {
    const { nome, preco, foto } = req.body;
    const { data, error } = await supabase
      .from('vagas')
      .update({ nome, preco, foto })
      .eq('id', req.params.id)
      .select();
    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
});


app.delete('/vagas/:id', async (req, res) => {
  try {
    const { error } = await supabase
      .from('vagas')
      .delete()
      .eq('id', req.params.id);
    if (error) throw error;
    res.json({ mensagem: 'Vaga deletada' });
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});