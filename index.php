<?php
    include('conect.php');
    $eventos_query = 'SELECT * FROM eventos ORDER by hora DESC LIMIT 8';
    $humedad_query = 'SELECT * FROM humedad ORDER by fecha DESC , hora DESC LIMIT 1';
    $luminosidad_query = 'SELECT * FROM luminosidad';
    $toldo_query = 'SELECT * FROM toldo ORDER by fecha DESC , hora DESC LIMIT 6';
    $toldo_estado_query = 'SELECT * FROM toldo ORDER by fecha DESC , hora DESC LIMIT 1';

    $humedad_avg_query = 'SELECT AVG(humedad) AS avg FROM humedad';
    $humedad_avg = mysqli_query($conex, $humedad_avg_query);

    $humedad_min_query = 'SELECT MIN(humedad) AS min FROM humedad';
    $humedad_max_query = 'SELECT MAX(humedad) AS max FROM humedad';
    $humedad_min = mysqli_query($conex, $humedad_min_query);
    $humedad_max = mysqli_query($conex, $humedad_max_query);

    $n_eventos_query = 'SELECT COUNT(*) as total FROM eventos';
    $n_eventos = mysqli_query($conex, $n_eventos_query);
    
    
    $eventos= mysqli_query($conex, $eventos_query);
    $humedad = mysqli_query($conex, $humedad_query);
    $luminosidad = mysqli_query($conex, $luminosidad_query);
    $toldo = mysqli_query($conex, $toldo_query);
    $toldo_estado = mysqli_query($conex, $toldo_estado_query);
?>


<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css">
    <link rel="stylesheet" href="style.css">
    <script src="https://kit.fontawesome.com/3271cbf67b.js" crossorigin="anonymous"></script>
    
    <script src="mysql.js"></script>
    <title>Kit Invernadero</title>
</head>

<body>

    <div class="head">

        <div class="logo">
            <a href="index.php">Invernadero Inteligente</a>
        </div>


        <div class="lbl-menu">
            <label for="radio4">Mediciones de Luminosidad</label>
            <label for="radio2">Eventos Destacados</label>
            <label for="radio3">Niveles de Humedad</label>
            <label for="radio1" style="padding-top: 8px; "><img src="imagenes/image.png" alt="Inicio"></label>
        </div>

    </div>


    <header class="content header">
        <h2 class="title"></h2>
    </header>

    <div class="content ">
        <input type="radio" name="radio" id="radio1" checked>
        <div class="tab1">

            <h2 style="color: white; font-size: 45px;">Invernadero Inteligente</h2>
            <p style="text-align: left;">Un invernadero inteligente es un sistema avanzado que utiliza tecnología para mejorar el crecimiento 
                y la salud de las plantas en un entorno controlado. Este tipo de invernadero está equipado con sensores que miden la humedad,
                el nivel de luz en el ambiente y eventos como detectar animales cerca, etc. Todo para optimizar las condiciones de cultivo.
                <br>
                Medidor de Luminosidad. <br>
                el sensor de nivel de luz mide la cantidad de luz disponible en el invernadero, lo que permite al 
                sistema controlar la iluminación artificial y ajustar la exposición de las plantas a la luz natural. 
                Esto es especialmente útil en regiones donde la luz del sol es limitada o donde las condiciones 
                climáticas cambian con frecuencia. Este nos mostrara la hora y la fecha exacta en la cual se abre y cierra el toldo.
                <br>
                Medidor de Humedad. <br>
                el sensor de humedad monitorea el nivel de humedad en el suelo y en el aire, lo que permite al sistema determinar cuándo 
                es necesario regar las plantas o ajustar la humedad del aire. Esto se hace mediante la activación de un sistema de riego 
                automatizado o un sistema de ventilación controlado. 
                <br>
                Sensor de Eventos. <br>
                El sensor de eventos es mas que nada un sensor de movimiento el cual nos podra detectar si pasan animales cerca los cuales
                podrian arruinar los cultivos o comerselos como zorros y otros animales. Este al activarse colocaria unas vallas para evitar
                el paso de animales y que puedan estropear los cultivos 
                </p>


            
        </div>

        <input type="radio" name="radio" id="radio2">
        <div class="tab2">
        <?php
        while ($row = mysqli_fetch_assoc($n_eventos)){?>
        
            <h2>Eventos Destacados</h2>
            <p>Se han detectado <?php echo $row['total'] ?> eventos de proximidad 
            <?php }?>

            <table width="100%;">

                <tr> 
                    <th>Fecha</th>
                    <th>Hora</th>
                    <th>Distancia</th>
                </tr>
                
                <?php
                while ($row = mysqli_fetch_assoc($eventos)){?>

                <tr>
                    <td><?php echo $row['fecha'] ?></td>
                    <td><?php echo $row['hora'] ?></td>
                    <td><?php echo $row['medicion']?>cm</td>
                </tr>
                <?php }?>
                

            </table>

        </div>

        <input type="radio" name="radio" id="radio3">
        <div class="tab3">
            <h2>Niveles de Humedad</h2>
            <p id="elementos">
            <?php
                while ($row = mysqli_fetch_assoc($humedad)){?>

                <tr>
                    <td><?php echo $row['fecha'] ?></td>
                    <td><?php echo $row['hora'] ?></td>
                    <td><?php echo $row['humedad']?>%</td>
                    <td><?php echo $row['temperatura']?>°C</td>
                </tr>
                <?php }?>
            </p>
            <?php
                while ($avg = mysqli_fetch_assoc($humedad_avg)){
                    $max = mysqli_fetch_assoc($humedad_max); 
                    $min = mysqli_fetch_assoc($humedad_min);  ?>
            <p> La medición de humedad más altaregistrada es: <?php echo $max['max']?>% <br>
            la medición de humedad más baja registrada es: <?php echo $min['min']?> %<br>
            la medición de humedad promedio es: <?php echo $avg['avg'] ?> %
            </p>
            <?php }?>
        </div>

        <input type="radio" name="radio" id="radio4">
        <div class="tab4">
            <h2>Mediciones de Luminosidad</h2>
            <p id='hora'>
            <?php $out  = mysqli_fetch_assoc($toldo_estado);
            echo $out['fecha']," " ,$out['hora'], " ",$out['estado'] 
            ?>
            </p>
            <table width="100%;">
                <tr>
                    <th>Fecha</th>
                    <th>Hora </th>
                    <th>Estado del Toldo</th>
                </tr>
                <?php
                while ($row = mysqli_fetch_assoc($toldo)){?>

                <tr>
                    <td><?php echo $row['fecha'] ?></td>
                    <td><?php echo $row['hora'] ?></td>
                    <td><?php echo $row['estado']?></td>
                    
                </tr>
                <?php }?>
                    
            </table>
        </div>

        </section>
</body>

</html>