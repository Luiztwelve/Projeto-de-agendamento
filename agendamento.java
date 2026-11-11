
import java.util.Scanner;

public class agendamento {

    private int horario;
    private String pessoa;
    private boolean ocupado = false;
    private int limiteVagas = 5;

    public static void main(String[] args) {

        Scanner scanner = new Scanner(System.in);

        agendamento Cliente = new agendamento();

        while (Cliente.limiteVagas > 0) {

            System.out.println("\nDigite o horario desejado (8 a 17): ");
            int horario = scanner.nextInt();

            Cliente.agendar(horario);
        }

        System.out.println("\nTodas as vagas foram preenchidas!");

        scanner.close();
    }

    public void agendar(int horario) {

        if (horario < 8 || horario > 17) {

            System.out.println("Horario invalido!");
            return;
        }

        if (limiteVagas > 0) {

            this.horario = horario;

            limiteVagas--;

            System.out.println("Seu horario foi agendado!");
            System.out.println("Horario escolhido: " + horario + "h");
            System.out.println("Vagas restantes: " + limiteVagas);

            if (limiteVagas == 0) {
                ocupado = true;
            }

        } else {

            System.out.println("Nao temos mais vagas disponiveis!");
        }
    }
}
